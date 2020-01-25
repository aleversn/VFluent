#! /usr/bin/env sh
set -e
yarn docs:build
cd examples/docs/.vuepress/dist
git init
git add -A
git commit -m '[git page]vfluent design'
git push -f https://github.com/aleversn/VFluent.git master:gh-pages
cd ..
rm -rf ./dist
cd ../../