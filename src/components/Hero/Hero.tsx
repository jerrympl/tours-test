import React, { ReactNode } from 'react';
import { StylableComponent, useStyles } from '../../utils/hooks/useStyles';

export type HeroProps = {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  cta?: ReactNode | string;
};
export type HeroStyles = {
  root: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
};

export const Hero: StylableComponent<HeroProps, HeroStyles> = (props) => {
  const classes = useStyles(
    {
      root: 'Hero',
      cta: 'Hero__cta',
      image: 'Hero__image',
      subtitle: 'Hero__subtitle',
      title: 'Hero__title',
    },
    props.styles,
  );
  return (
    <div className={classes.root}>
      <img className={classes.image} src={props.imageUrl} alt={props.title} />
      <div className="Hero__wrapper">
        <div className="Hero__text">
          {props.title && <h1 className={classes.title}>{props.title}</h1>}
          {props.subtitle && (
            <h1 className={classes.subtitle}>{props.subtitle}</h1>
          )}
          {props.cta && <div className={classes.cta}>{props.cta}</div>}
        </div>
      </div>
    </div>
  );
};
