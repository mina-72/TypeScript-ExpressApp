import { Router, Request, Response, NextFunction } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

//authenticate middleware
function requireAuth (req: Request, res: Response, next: NextFunction): void{
    if (req.session && req.session.loggedIn){
        next()
        return
    }

    res.status(403)
    res.send ('Not Premitted')
}

const router = Router()



router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body

    if ( email && password && email === 'mina.com' && password === '123' ) {
        // mark user as logged in
        req.session = { loggedIn: true }

        // redirect to '/' route
        res.redirect ('/')
    }
    else {
        res.send ('provide email')
    }
})

router.get('/', (req: Request, res: Response) => {
    // check if user is logged in or not: req.session is: if user has session, req.session.loggedIn is: if user is logged in
    if (req.session && req.session.loggedIn){
        res.send (`
            <div>
                <div> You are logged in </div>
                <a href="/logout"> Logout </a>
            </div>
         `)
    } else {
        res.send (`
            <div>
                <div> You are not logged in </div>
                <a href="/login"> Login </a>
            </div>
         `)
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send ( 'welcome to protected route. you are logged in')
})

export { router }