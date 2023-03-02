import { RequestHandler } from "express";
import { metadataKeys } from "./metadataKeys";

export function use(middleware: RequestHandler ) {
    return function ( target: any, key: string, desc: PropertyDescriptor) {
        // if there is not any middleware return empty array, else: return middlewares
        const middlewares = Reflect.getMetadata(metadataKeys.middleware, target, key) || [];

        // middlewares.push(middleware) is equal to: [...middleware,middlewares]

        Reflect.defineMetadata(metadataKeys.middleware, [...middlewares,middleware] , target, key)
    }
}