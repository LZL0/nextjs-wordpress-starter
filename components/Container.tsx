interface Container {
  children: string | JSX.Element | JSX.Element[];
}

export default function Container({ children }: Container): JSX.Element {
  return <div className="container mx-auto px-5">{children}</div>;
}
