import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { BodyValidationMiddleware } from './middlewares/bodyValidation.middleware';

@Module({
  imports: [UsersModule, OrdersModule, AuthModule],

})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyValidationMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
