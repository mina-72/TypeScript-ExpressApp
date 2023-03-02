import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { Methods } from './methods'
import { metadataKeys } from './metadataKeys'


export function controller(routerPreFix: string){
    return function(target: Function){
        const router= AppRouter.getInstance()
        for ( let key in target.prototype){
            const routeHandler = target.prototype[key]

            const path = Reflect.getMetadata(metadataKeys.path, target.prototype, key)
            const method:Methods = Reflect.getMetadata(metadataKeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(metadataKeys.middleware, target, key) || []

            if (path) {
                router[method](`${routerPreFix}${path}`, ...middlewares, routeHandler)
            }
        }
    }
}