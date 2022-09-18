import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioEntity } from './socio/socio.entity';

@Module({
  imports: [
    ProductModule,
    StoreModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'club',
      entities: [SocioEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    ProductStoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
