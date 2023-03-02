import 'reflect-metadata'
import { AppRouter } from '../../AppRouter'
import { Methods } from './methods'
import { metadataKeys } from './metadataKeys'
import { Request, Response, NextFunction, RequestHandler } from 'express'

function bodyValidator(keys: string): RequestHandler {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            res.status(422).send('invalid request')
            return
    }
    for (let key of keys) {
        if (!req.body){
            res.status(422).send('invalid request')
        }
    }
    next()
}
}

export function controller(routerPreFix: string){
    return function(target: Function){
        const router= AppRouter.getInstance()
        for ( let key in target.prototype){
            const routeHandler = target.prototype[key]

            const path = Reflect.getMetadata(metadataKeys.path, target.prototype, key)
            const method:Methods = Reflect.getMetadata(metadataKeys.method, target.prototype, key)
            const middlewares = Reflect.getMetadata(metadataKeys.middleware, target.prototype, key) || []
            const requiredBodyValidator = Reflect.getMetadata(metadataKeys.validator, target.prototype, key) || []

            const validator = bodyValidator(requiredBodyValidator)


            if (path) {
                router[method](`${routerPreFix}${path}`, ...middlewares, validator, routeHandler)
            }
        }
    }
}