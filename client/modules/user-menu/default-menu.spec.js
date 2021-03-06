'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const wraptile = require('wraptile');
const defaultMenu = require('./default-menu');
const tryToCatch = require('try-to-catch');
const {_data} = defaultMenu;
const reject = wraptile(async (a) => {
    throw Error(a);
});

test('cloudcmd: client: user menu: RESTful.write', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {write} = DOM.RESTful;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
        tryToCatch,
    });
    
    const path = '/.cloudcmd.menu.js';
    t.ok(write.calledWith(path, _data), 'should call RESTful.write');
    t.end();
});

test('cloudcmd: client: user menu: refresh', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {refresh} = CloudCmd;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
        tryToCatch,
    });
    
    t.ok(refresh.calledWith(), 'should call CloudCmd.refresh');
    t.end();
});

test('cloudcmd: client: user menu: setCurrentByName', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {setCurrentByName} = DOM;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
        tryToCatch,
    });
    
    const fileName = '.cloudcmd.menu.js';
    t.ok(setCurrentByName.calledWith(fileName), 'should call DOM.setCurrentByName');
    t.end();
});

test('cloudcmd: client: user menu: EditFile.show', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {EditFile} = CloudCmd;
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
        tryToCatch,
    });
    
    t.ok(EditFile.show.called, 'should call EditFile.show');
    t.end();
});

test('cloudcmd: client: user menu: no EditFile.show', async (t) => {
    const name = 'C - Create User Menu File';
    const DOM = getDOM();
    const CloudCmd = getCloudCmd();
    const {RESTful} = DOM;
    const {EditFile} = CloudCmd;
    
    RESTful.write = stub(reject('Error'));
    
    await defaultMenu[name]({
        DOM,
        CloudCmd,
        tryToCatch,
    });
    
    t.notOk(EditFile.show.called, 'should not call EditFile.show');
    t.end();
});

function getDOM() {
    const RESTful = {
        write: stub(),
    };
    
    const CurrentInfo = {
        dirPath: '/',
    };
    
    return {
        RESTful,
        CurrentInfo,
        setCurrentByName: stub(),
    };
}

function getCloudCmd() {
    return {
        refresh: stub(),
        EditFile: {
            show: stub(),
        },
    };
}
