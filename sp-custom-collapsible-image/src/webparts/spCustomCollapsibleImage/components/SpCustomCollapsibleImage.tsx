import * as React from 'react';
import { useEffect } from 'react';
import styles from './SpCustomCollapsibleImage.module.scss';
import { ISpCustomCollapsibleImageProps } from "./ISpCustomCollapsibleImageProps";
import { Image, IImageProps, ImageFit, Icon, Link } from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';


const SpCustomCollapsibleImage: React.FC<ISpCustomCollapsibleImageProps> = (props) => {
  const [isTextShown, { setTrue: showText, setFalse: hideText }] = useBoolean(false);
  const [isChevronIconShown, { setTrue: showChevronIcon, setFalse: hideChevronOut }] = useBoolean(false);

  useEffect(() => {
    console.log('img: ', props.image);
    console.log('textTitle: ', props.textTitle);
    console.log('textTitleLink: ', props.textTitleLink);

  }, [props.image, props.textTitle]);

  const openLink = () => {
    if (props.textTitleLink && props.textTitleLink !== undefined) {
      window.open(props.textTitleLink, '_blank');
    }
  };

  const imageProps: IImageProps = {
    src: props.image,
    className: styles.imageContainer,
    width: `${props.imgWidth}px`,
    height: `${props.imgHeight}px`,
    imageFit: ImageFit.contain,
    // maximizeFrame: true,
    // imageFit: ImageFit.cover,
    // width: '358px',
    // height: '173px',
    // imageFit: ImageFit.cover,

    //styles: (props) => ({ root: { border: '1px solid ' + props.theme.palette.neutralSecondary } }),
  };

  return (
    <div>
      {props.image ? (
        <Image {...imageProps}
          onMouseOver={() => showChevronIcon()}
          onMouseOut={() => hideChevronOut()}
          onClick={() => isTextShown ? hideText() : showText()}
        />) :
        (<h2>Configura la Webpart aggiungendo un'immagine.</h2>)}
      {isChevronIconShown && (<div className={styles.chevronIcon} style={{ fontSize: props.chevronFontSize }}>
        <Icon iconName={isTextShown ? 'ChevronUp' : 'ChevronDown'} />
      </div>)}
      {isTextShown && (
        <>
          {props.textTitle && props.textTitle !== undefined && (
            <>
              <h1 onClick={() => openLink()} style={props.textTitleLink && props.textTitleLink !== undefined ? { cursor: 'pointer' } : {}}>
                {props.textTitle}&nbsp;
                {props.textTitleLink && props.textTitleLink !== undefined &&
                  (<a href={props.textTitleLink} target="_blank" data-interception="off" className={styles.linkIcon} >
                    <Icon iconName='OpenInNewTab' />
                  </a>)}
              </h1>
            </>
          )}
          <div dangerouslySetInnerHTML={{ __html: props?.text }}></div>
        </>)}


    </div>
  );
};

export default SpCustomCollapsibleImage;


// import * as React from 'react';
// import styles from './SpCustomCollapsibleImage.module.scss';
// import { ISpCustomCollapsibleImageProps } from './ISpCustomCollapsibleImageProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class SpCustomCollapsibleImage extends React.Component<ISpCustomCollapsibleImageProps, {}> {
//   public render(): React.ReactElement<ISpCustomCollapsibleImageProps> {
//     return (
//       <div className={ styles.sp-customCollapsibleImage }>
//         <div className={ styles.container }>
//           <div className={ styles.row }>
//             <div className={ styles.column }>
//               <span className={ styles.title }>Welcome to SharePoint!</span>
//               <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
//               <p className={ styles.description }>{escape(this.props.text)}</p>
//               <a href="https://aka.ms/spfx" className={ styles.button }>
//                 <span className={ styles.label }>Learn more</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       // <div>
//       //   <img src={this.props.image}> </img>
//       //   <div dangerouslySetInnerHTML={{ __html: this.props.text }}></div>
//       // </div>
//     );
//   }
// }
