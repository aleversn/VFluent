git add -A
yarn config set version-git-message "[release] publish v%s npm-package"
yarn version --patch
git push
git push --tags