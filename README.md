[![Build Status](https://travis-ci.org/sgimeno/metricon.svg?branch=master)](https://travis-ci.org/sgimeno/metricon)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


metricon
========

### Usage
```
$ npm i -g metricon
$ export GH_TOKEN=<YOUR_GITHUB_TOKEN>
# You can generate one here: https://github.com/settings/tokens/
```

#### Commands

```
$ metricon report -O sgimeno -R metricon -M "Test milestone" -B sgimeno/metricon
```
```
$ metricon retro -O sgimeno -M "Test milestone" -E glad -D "DevOps are just crazy"
```




### Develop

```
$ npm install
$ npm run dev
```

### Test

```
$ npm test
```

### TODO

 + document options
 + add CLI for login
