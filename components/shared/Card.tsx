import * as React from 'react';
import clsx from 'clsx';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface RootProps extends DivProps {}

const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <div
      className={clsx(
        'card w-full rounded border bg-base-100 shadow',
        // your previous dark styles
        'dark:bg-black dark:border-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  tag?: keyof JSX.IntrinsicElements; // support <Card.Title tag="h2" />
}

const Title = ({ children, className, tag = 'h2', ...props }: TitleProps) => {
  const Comp = tag as any;
  return (
    <Comp
      className={clsx(
        'card-title text-xl font-medium leading-none tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

const Description = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx('text-gray-600 dark:text-gray-400 text-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({ children, className, ...props }: DivProps) => {
  return (
    <div className={clsx('flex flex-col gap-2', className)} {...props}>
      {children}
    </div>
  );
};

const Body = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      className={clsx('card-body gap-4 p-6 dark:bg-black', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Footer = ({ children, className, ...props }: DivProps) => {
  return (
    <div
      className={clsx(
        'card-actions justify-end border-t bg-gray-50 p-2',
        'dark:border-gray-600 dark:bg-black',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Namespace export for Card.Body, Card.Title, etc.
export const Card = Object.assign(Root, {
  Body,
  Title,
  Description,
  Header,
  Footer,
});

export default Card;