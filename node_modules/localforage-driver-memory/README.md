# localforage-driver-memory

In-memory localforage driver that forgets all data on page reload.

[![NpmVersion](https://img.shields.io/npm/v/localforage-driver-memory.svg?style=flat-square)](https://www.npmjs.com/package/localforage-driver-memory)
[![Travis (.com) branch](https://img.shields.io/travis/com/Alorel/localforage-driver-memory/1.0.5.svg?style=flat-square)](https://travis-ci.com/Alorel/localforage-driver-memory)
[![Coveralls github branch](https://img.shields.io/coveralls/github/Alorel/localforage-driver-memory/1.0.5.svg?style=flat-square)](https://coveralls.io/github/Alorel/localforage-driver-memory)
[![Greenkeeper badge](https://badges.greenkeeper.io/Alorel/localforage-driver-memory.svg)](https://greenkeeper.io/)

UMD global name: **localforageDriverMemory**

---

# Installation

```bash
npm install localforage-driver-memory
```

# Usage

```javascript
import * as localforage from 'localforage';
import * as memoryDriver from 'localforage-driver-memory';

localforage.defineDriver(memoryDriver);
localforage.setDriver(memoryDriver._driver);

```

