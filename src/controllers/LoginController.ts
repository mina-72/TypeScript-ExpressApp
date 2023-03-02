import { Request, Response, NextFunction } from 'express'
import { get, controller, use, post, bodyValidator }  from './decorators'


@controller('/auth')
class LoginControllers {
    @get('/login')
    getLogin(req: Request, res: Response): void {
        res.send (`
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
            `)
    }

    @post('/login')
    @bodyValidator('email','password')
    postLogin(req: Request, res: Response) {
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
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/')
    }
}