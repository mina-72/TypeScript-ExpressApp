import { Request, Response, NextFunction} from 'express'
import { controller } from './decorators/controller'
import { get } from './decorators/routes'
import { use } from './decorators/use'


//authenticate middleware
function requireAuth (req: Request, res: Response, next: NextFunction): void{
    if (req.session && req.session.loggedIn){
        next()
        return
    }

    res.status(403)
    res.send ('Not Premitted')
}

@controller('')
class RootRoutControllers {
    @get('/')
    getRoot(req: Request, res: Response){
        // check if user is logged in or not: req.session is: if user has session, req.session.loggedIn is: if user is logged in
        if (req.session && req.session.loggedIn){
            res.send (`
                <div>
                    <div> You are logged in </div>
                    <a href="/auth/logout"> Logout </a>
                </div>
             `)
        } else {
            res.send (`
                <div>
                    <div> You are not logged in </div>
                    <a href="/auth/login"> Login </a>
                </div>
             `)
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send ( 'welcome to protected route. you are logged in')
    }
    
}