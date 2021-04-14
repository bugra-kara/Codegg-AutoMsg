module.exports.checkCommandModule = (cmdName,cmdModule) =>{
    if(!cmdModule.hasOwnProperty('run')) {
        throw new Error(cmdName + " Module does not have property 'run'")
    }
    if(!cmdModule.hasOwnProperty('aliases')) {
        throw new Error(cmdName + " Module does not have property 'aliases'")
    }
    if(!cmdModule.hasOwnProperty('description')) {
        throw new Error(cmdName + " Module does not have property 'description'")
    }
    return true;
}
module.exports.checkProperties = (cmdName,cmdModule) => {
    if (typeof cmdModule.run !== 'function') {
        throw new Error(`${cmdName} command: run is not a function`);
    }
    if (typeof cmdModule.description !== 'string'){
        throw new Error(`${cmdName} command: description is not a string`);
    }
    if (!Array.isArray(cmdModule.aliases)){
        throw new Error(`${cmdName} command: aliases is not a array`);
    }
    return true;
}