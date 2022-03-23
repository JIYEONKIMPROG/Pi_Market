import React from 'react';
import { useEffect } from 'react';

export const Banner = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    const mainBg = document.getElementById('main-bg');
    const gradient = document.getElementById('bg-gradient');
    if (mainBg && props.useBannerBg) {
      mainBg.style.backgroundImage = `url(${props.src})`;
      mainBg.style.display = 'inline-block';
      if (gradient) {
        gradient.style.display = 'inline-block';
      }
    }

    return () => {
      const mainBg = document.getElementById('main-bg');
      const gradient = document.getElementById('bg-gradient');
      if (mainBg && props.useBannerBg) {
        mainBg.style.backgroundImage = '';
        mainBg.style.display = 'none';
      }
      if (gradient) gradient.style.display = 'none';
    };
  }, [props.src, props.useBannerBg]);

  return (
    <>
      <div id="mobile-banner">
        <img className="banner-img" src={props.src} />
        <div className="banner-content">
          <div id={'main-heading'}>{props.headingText}</div>
          <div id={'sub-heading'}>{props.subHeadingText}</div>
          {props.actionComponent}
        </div>
      </div>
      <div
        id={'current-banner'}
       //style={{ backgroundImage: `url(${props.src})` }}
      >
        <span id={'gradient-banner'}></span>
        <div id="banner-inner">
          <div id={'message-container'} style={{margin:'auto', maxWidth:'100% !important'}}>
            <div style={{display:'flex',width:'100%',borderBottom:'1px solid black'}}>
              <div>
            <div style={{fontSize:'60px',fontWeight:'bold',marginBottom:'50px',color:'#00704a',textShadow:'0px 1px 5px rgba(0, 0, 0, .5)'}} id={'main-heading'}>{props.headingText}</div>
            <div style={{fontSize:'20px', lineHeight:'40px'}} id={'sub-heading'}>{props.subHeadingText}</div>
            </div>
            <img  style={{width:'500px',marginTop:'-200px',marginLeft:'300px'}}src="/wave.png"/>
            </div>
            {props.actionComponent}
          </div>
          
          {props.children}
          
        </div>
      </div>
    </>
  );
};
