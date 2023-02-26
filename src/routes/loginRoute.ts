import { Router, Request, Response } from 'express'

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

const router = Router()

router.get('/login', (req, res) => {
    res.send (
        `
            <form method ="post">
                <div>
                    <label>Email</label>
                    <input name="email"/>
                </div>
                <div>
                <label>Password</label>
                <input name="password" type= "password"/>
                </div>
                <button type="submit">Submit</button>
            </form>
        `
    )
})

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

export { router }