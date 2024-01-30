type TConstructor= new (...args: any[]) => {};

export function applyMixins(derivedCtor: TConstructor, constructors: TConstructor[]) {
  const derivedCtorMethods = Object.getOwnPropertyNames(derivedCtor.prototype);

  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (derivedCtorMethods.includes(name)) return;

      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null),
      );
    });
  });
}
