import { AspectRegistry, Targets } from './aspect';

export function weave<TFunction extends Function>(target: TFunction, config?: any): TFunction {
  if (target.hasOwnProperty('__woven__')) {
    return;
  }

  for (const aspect of Array.from(AspectRegistry.values())) {
    aspect.apply(target, config);
  }

  Targets.add({ target, config });
  (target as any).__woven__ = true;
  return target;
}

export function Advised(config?: any): ClassDecorator {
  return function<TFunction extends Function>(target: TFunction) {
    return weave(target, config);
  };
}
