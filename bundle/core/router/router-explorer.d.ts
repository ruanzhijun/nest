import { RequestMethod } from '@nestjs/common/enums/request-method.enum';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import 'reflect-metadata';
import { ApplicationConfig } from '../application-config';
import { NestContainer } from '../injector/container';
import { MetadataScanner } from '../metadata-scanner';
import { ExceptionsFilter } from './interfaces/exceptions-filter.interface';
import { RouterProxy, RouterProxyCallback } from './router-proxy';
export interface RoutePathProperties {
    path: string;
    requestMethod: RequestMethod;
    targetCallback: RouterProxyCallback;
    methodName: string;
}
export declare class RouterExplorer {
    private readonly metadataScanner;
    private readonly routerProxy;
    private readonly exceptionsFilter;
    private readonly config;
    private readonly executionContextCreator;
    private readonly routerMethodFactory;
    private readonly logger;
    constructor(metadataScanner: MetadataScanner, container: NestContainer, routerProxy?: RouterProxy, exceptionsFilter?: ExceptionsFilter, config?: ApplicationConfig);
    explore(instance: Controller, metatype: Type<Controller>, module: string, appInstance: any, basePath: string): void;
    extractRouterPath(metatype: Type<Controller>, prefix?: string): string;
    validateRoutePath(path: string): string;
    scanForPaths(instance: Controller, prototype?: any): RoutePathProperties[];
    exploreMethodMetadata(instance: Controller, instancePrototype: any, methodName: string): RoutePathProperties;
    applyPathsToRouterProxy(router: any, routePaths: RoutePathProperties[], instance: Controller, module: string, basePath: string): void;
    private applyCallbackToRouter(router, pathProperties, instance, module, basePath);
    private createCallbackProxy(instance, callback, methodName, module, requestMethod);
}
