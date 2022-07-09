'use strict'

const components = require("../components.json")
const fileSave = require("file-save")
const fs = require("fs")
const babel = require("@babel/core")
const path = require("path")
const { Object } = require("core-js")

function midline(name) {
    return name.replace(/\B([A-Z])/g, "-$1").toLowerCase()
}

const getComponentAttributes = (compoentName) => {
    let vueSingleCompoent = fs.readFileSync(`./packages/${compoentName}/src/index.vue`).toString();
    let js = vueSingleCompoent.match(/<script>[\s\S]*<\/script>/g)[0]
    let emitsOrigin = vueSingleCompoent.match(/\$emit\(['"` ]+(.*)['"` ]+,.*\)/mg)
    let emits = []
    if (emitsOrigin != null)
        for (let emit of emitsOrigin) {
            emits.push(emit.match(/\$emit\(['"` ]+(.*)['"` ]+,.*\)/m)[1])
        }

    js = js.replace(/<\/{0,1}script>/g, "").replace(/export default (\{[\s\S]*\});{0,1}/mg, "($1)").replace(/;\s*$/g, "").replace(/import (.*) from ["']{1}.*["']{1}/g, "const $1={};").replace(/import ["'].*css["'];/g, "").replace(/import ["'].*js["'];/g, "")

    try {
        js = babel.transform(js, {
            filename: "buildVuter.js",
            presets: [["@vue/babel-preset-jsx", {
                "injectH": false
            }]],
        }).code
    } catch (e) {
        if (e instanceof TypeError) {
            console.log(js)
        }
        throw e
    }
    let component = eval(`${js}`)
    let attributes = []
    for (let key in component.props) {
        attributes.push(midline(key), midline(`:${key}`))
    }
    for (let key of emits) {
        attributes.push(midline(`@${key}`))
    }
    // show attributes in console
    // console.log("attributes", attributes)
    return attributes
}

const decodeMarkdownTable = (tableString) => {
    let tables = []
    let lines = []
    let last = -1;
    for (let index = 0; index < tableString.length; ++index) {
        if (tableString[index] == '|') {
            if (last != -1) {
                lines.push(tableString.substring(last + 1, index).trim())
            }
            last = index;
        } else if (tableString[index] == '\n') {
            if (lines.length > 0)
                tables.push(lines)
            last = -1;
            lines = []
        }
    }
    if (lines.length > 0) {
        tables.push(lines)
    }
    return tables;
}


/**
 * Decode component attributes from markdown table
 * @param {string} componentName Component Name
 * @returns {Object} Component attributes
 */
const getComponentAttributeDetails = (componentName) => {
    let filePath = `./examples/docs/zh/${componentName.trim()}/README.md`
    let vueSingleReadme = fs.readFileSync(filePath).toString();
    let propsTable = vueSingleReadme.match(/### Propoties(\r\n|\n)+?---(\r\n|\n)+?\|[\s\S]*?(\r\n|\n)+?((\r\n|\n)+?|$)/m)
    let componentDetails = {}
    // decode props table
    if (propsTable && propsTable.length > 0) {
        propsTable = decodeMarkdownTable(propsTable[0])
        for (let index = 2; index < propsTable.length; ++index) {
            let items = propsTable[index]
            let obj = {}
            try {
                let options = eval(`(${items[1]})`)
                if (options.length > 0 && typeof options[0] == "function") {
                    obj.type = typeof options[0]()
                } else
                    obj.options = options
            } catch {
                let type = items[1].replace(/[\[\]]/g, "").replace(/\(.*\)/g, "")
                obj.type = type
            }
            obj.description = `${items[4]}${items[3] == 'N/A' ? "" : ",default=" + items[3]}`
            componentDetails[midline(`fv-${componentName}/${items[0]}`)] = obj
            componentDetails[midline(`fv-${componentName}/:${items[0]}`)] = obj
        }
    }

    // decode events table
    let eventsTable = vueSingleReadme.match(/### Events(\r\n|\n)+?---(\r\n|\n)+?\|[\s\S]*?((\r\n|\n)+?|$)/m);
    if (eventsTable && eventsTable.length > 0) {
        eventsTable = decodeMarkdownTable(eventsTable[0])
        for (let index = 2; index < eventsTable.length; ++index) {
            let items = eventsTable[index]
            let obj = {
                type: "method",
                description: items[2]
            }
            componentDetails[midline(`fv-${componentName}/${items[0]}`)] = obj
            componentDetails[midline(`fv-${componentName}/@${items[0]}`)] = obj
        }
    }
    // console.log("componentDetails", componentDetails)
    if (Object.keys(componentDetails).length == 0) {
        console.log(componentName)
    }

    return componentDetails
}



let tags = {}
let attributes = {}
for (let componentName in components) {
    tags[midline(`fv-${componentName}`)] = {
        attributes: getComponentAttributes(componentName)
    }
    attributes = Object.assign(attributes, getComponentAttributeDetails(componentName))
}


fileSave(path.join(__dirname, "../vetur/tags.json")).write(JSON.stringify(tags, null, 2), 'utf8').end('\n')
fileSave(path.join(__dirname, "../vetur/attributes.json")).write(JSON.stringify(attributes, null, 2), 'utf8').end('\n')