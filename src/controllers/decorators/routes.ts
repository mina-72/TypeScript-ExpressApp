import { RequestHandler } from 'express'
import 'reflect-metadata'
import { Methods } from './methods'
import { metadataKeys } from './metadataKeys'

interface routeHandlerDescriptor {
    value?: RequestHandler
}

function routeBinder(method: string){
    return function(path: string){
    return function(target: any, key: string, desc: routeHandlerDescriptor){
        Reflect.defineMetadata(metadataKeys.path, path, target, key)
        Reflect.defineMetadata(metadataKeys.method, method, target, key)
    }
}
}

export const get = routeBinder(Methods.get)
export const post = routeBinder(Methods.post)
export const put = routeBinder(Methods.put)
export const del = routeBinder(Methods.del)
export const patch = routeBinder(Methods.patch)