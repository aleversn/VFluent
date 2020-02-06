---
  title: DetailsList DetailsList
  sidebarDepth: 2
---
  
[[toc]]

### DetailsList-DEMO

<script>
export default {
    data () {
        return {
            value: [
                {
                  id: "",
                  name: "Windows 10（2019 年 11 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:37:41 PM",
                  update_time: "2019/10/10 1:37:41 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:05:21 PM",
                  update_time: "2019/10/10 7:59:50 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "macOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:23 PM",
                  update_time: "2019/10/10 7:59:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Android",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:45 PM",
                  update_time: "2019/10/10 7:12:45 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "iOS",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 7:12:29 PM",
                  update_time: "2019/10/10 7:12:29 PM",
                  prop: "Edge"
                },
                {
                  id: "",
                  name: "Windows 10（2019 年 5 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSC"
                  },
                  publish_time: "2019/10/10 6:51:07 PM",
                  update_time: "2019/10/10 6:51:07 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 10（2018 年 10 月更新）",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:30:10 PM",
                  update_time: "2019/10/10 6:50:34 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Visual Studio Download Center",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:26:39 PM",
                  update_time: "2019/10/10 1:26:39 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio Code",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:23:46 PM",
                  update_time: "2019/10/10 1:23:46 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Visual Studio 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 1:17:24 PM",
                  update_time: "2019/10/10 1:17:24 PM",
                  prop: "Visual Studio"
                },
                {
                  id: "",
                  name: "Microsoft Office 365",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 10:32:18 AM",
                  update_time: "2019/10/10 10:32:18 AM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 7",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 4:24:17 PM",
                  update_time: "2019/10/10 3:46:50 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows 8",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "Alever"
                  },
                  publish_time: "2019/10/10 9:29:59 PM",
                  update_time: "2019/10/10 3:46:44 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2013",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:02 AM",
                  update_time: "2019/10/10 3:46:20 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft  Office 2016",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:12 AM",
                  update_time: "2019/10/10 3:46:14 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Microsoft Office 2019",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 9:09:16 AM",
                  update_time: "2019/10/10 3:46:05 PM",
                  prop: "Office"
                },
                {
                  id: "",
                  name: "Windows 8.1",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:37 PM",
                  update_time: "2019/10/10 3:40:37 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows Vista",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:30 PM",
                  update_time: "2019/10/10 3:40:30 PM",
                  prop: "Windows"
                },
                {
                  id: "",
                  name: "Windows XP ",
                  publisher: "user",
                  userInfo: {
                    id: "",
                    name: "MSClub"
                  },
                  publish_time: "2019/10/10 3:40:22 PM",
                  update_time: "2019/10/10 3:40:22 PM",
                  prop: "Windows"
                }
          ],
          head: [{
                  content: "Name",
                  minWidth: 60,
                  width: 80,
                  sortName: "name"
              }, {
                  content: "Publisher",
                  minWidth: 60,
                  width: 80,
                  sortName: "publisher"
              }, {
                  content: "Publish Time",
                  minWidth: 60,
                  width: 190,
                  sortName: "publish_time"
              }, {
                  content: "Prop",
                  minWidth: 92,
                  width: 80,
                  sortName: "prop"
              }, {
                  content: "User Name",
                  minWidth: 60,
                  width: 80
          }]
        }
    }
}
</script>

<fv-DetailsList v-model="value" :head="head"><template v-slot:column_0="x"><p>{{x.item.name}}</p></template><template v-slot:column_1="x"><p>{{x.item.publisher}}</p></template><template v-slot:column_2="x"><p>{{x.item.publish_time}}</p></template><template v-slot:column_3="x"><p>{{x.item.prop}}</p></template><template v-slot:column_4="x"><p>{{x.item.userInfo.name}}</p></template></fv-DetailsList>

<div style="width: 100%; height: 100px;"></div>

### DetailsList-Allow Drag
---
<fv-DetailsList v-model="value" :head="head" :allowDrag="true"><template v-slot:column_0="x"><p>{{x.item.name}}</p></template><template v-slot:column_1="x"><p>{{x.item.publisher}}</p></template><template v-slot:column_2="x"><p>{{x.item.publish_time}}</p></template><template v-slot:column_3="x"><p>{{x.item.prop}}</p></template><template v-slot:column_4="x"><p>{{x.item.userInfo.name}}</p></template></fv-DetailsList>