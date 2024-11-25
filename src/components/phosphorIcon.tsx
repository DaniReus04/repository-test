import * as Icons from "@phosphor-icons/react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { IconContext, IconBase, ...restIcons } = Icons;

export const PhosphorIcons = {
  ...restIcons,
};

export interface IPhosphorIconProps extends Icons.IconProps {
  name: keyof typeof PhosphorIcons;
}

export function PhosphorIcon({ name, ...rest }: IPhosphorIconProps) {
  const IconName: any = name && Icons[name] ? Icons[name] : "Sticker";

  if (IconName) {
    return (
      <IconContext.Provider value={rest}>
        <IconName data-testid="icon" />
      </IconContext.Provider>
    );
  }

  return <> </>;
}
