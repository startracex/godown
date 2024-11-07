interface WithModule {
  module?: string;
}
interface InheritedFromWithModule {
  inheritedFrom?: WithModule;
}

interface ManifestModule {
  path?: string;
  exports?: {
    declaration?: WithModule;
  }[];
  declarations?: {
    members?: InheritedFromWithModule[];
    attributes?: InheritedFromWithModule[];
    events?: InheritedFromWithModule[];
    superclass?: WithModule;
  }[];
}

export default function (fn: (old: string) => string) {
  return {
    name: "fix-module",
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.modules.forEach(
        (
          mod: ManifestModule,
        ) => {
          if (mod.path) {
            mod.path = fn(mod.path);
          }

          mod.exports?.forEach(({ declaration }) => {
            if (declaration?.module) {
              declaration.module = fn(declaration.module);
            }
          });

          mod.declarations?.forEach(({ members, attributes, events, superclass }) => {
            [...(members || []), ...(attributes || []), ...(events || [])].forEach(({ inheritedFrom }) => {
              if (inheritedFrom?.module) {
                inheritedFrom.module = fn(inheritedFrom.module);
              }
            });
            if (superclass?.module) {
              superclass.module = fn(superclass.module);
            }
          });
        },
      );
    },
  };
}
