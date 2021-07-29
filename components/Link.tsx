import Link, { LinkProps } from 'next/link';

const AppLink = (props: { children:JSX.Element } & LinkProps) => <Link {...props} prefetch={false}>{props.children}</Link>;

export default AppLink;
