import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminJwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {        
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        let user
        try {
            const authHeader = req.headers.authorization
            const [bearer, token]= authHeader.split(' ')
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Пользователь не авторизован'})
            }
            user = this.jwtService.verify(token)            
            req.user = user                        
            
        } catch (e) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }

        if (user.username === 'admin') {
            return true
        } else {
            throw new UnauthorizedException({message: 'Данная функция доступна только администратору'})
        }

    }
}