import 'reflect-metadata';
import {AppRouter} from '../../AppRouter';
import {MetadataKeys} from './MetadataKeys';
import {Methods} from './Methods';

// export const router = express.Router();

export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();
		for (let key in target.prototype) {
			const routehandler = target.prototype[key];
			console.log(routehandler);

			const path = Reflect.getMetadata(
				MetadataKeys.path,
				target.prototype,
				key
			);
			const method: Methods = Reflect.getMetadata(
				MetadataKeys.method,
				target.prototype,
				key
			);
			const middlewares =
				Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
				[];

			if (path) {
				router[method](`${routePrefix}${path}`, ...middlewares, routehandler);
			}
		}
	};
}
