git config --global credential.helper "cache --timeout=3600"
git add -A
git commit -am "lol, shenanigans."
git push origin master --repo https://name:password@bitbucket.org/name/repo.git
