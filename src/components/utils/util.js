export const basePath = "http://127.0.0.1:8089" + "/wheelfactory" 
//"http://127.0.0.1:8089" + "/wheelfactory" 
//window.location.protocol + "//" + window.location.host + "/" + (window.location.pathname.substring(1) == '' ? '' : window.location.pathname.substring(1).substring(0, window.location.pathname.substring(1).indexOf('/'))) 
//
export const loadPluginsApi = '/api/pluginItem'
export const pluginDetailApi = '/api/getPluginById'
export const updateReadCounterApi ='/api/updateReadCounter'
export const updateLikeCounterApi ='/api/updateLikeCounter'
export const getTagsApi= '/api/getTagByPluginItemId'
export const loadAllTagsApi = '/api/getAllTags'
export const searchTagApi = '/api/searchByTag'
export const searchPluginItemApi = '/api/searchPluginItem'
export const loadFrameworkItemsApi = '/api/loadFrameworkItems'
export const getFrameworkDetailApi = '/api/getFrameworkItem'