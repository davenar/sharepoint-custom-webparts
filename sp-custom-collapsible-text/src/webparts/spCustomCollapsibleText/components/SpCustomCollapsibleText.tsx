import * as React from 'react';
import styles from './SpCustomCollapsibleText.module.scss';
import { ISpCustomCollapsibleTextProps } from './ISpCustomCollapsibleTextProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useBoolean } from '@uifabric/react-hooks';
import { Icon } from 'office-ui-fabric-react';



const SpCustomCollapsibleText: React.FC<ISpCustomCollapsibleTextProps> = (props) => {
  const [isTextShown, { setTrue: showText, setFalse: hideText }] = useBoolean(false);

  React.useEffect(() => {
    console.log('textTitle: ', props.textTitle);
    console.log('textTitleLink: ', props.textTitleLink);

  }, [props.textTitle]);

  const openLink = () => {
    if (props.textTitleLink && props.textTitleLink !== undefined) {
      window.open(props.textTitleLink, '_blank');
    }
  };


  return (
    <div>
      {props.title && props.title !== undefined ?
        (
          <h1 style={{ fontSize: props.titleFontSize }}>
            {props.title}&nbsp;
            <Icon className={styles.collapseChevron}
              iconName={isTextShown ? 'ChevronUp' : 'ChevronDown'}
              onClick={() => isTextShown ? hideText() : showText()} />
          </h1>
        ) :
        <h1>Configura la webpart.</h1>
      }

      {isTextShown && (
        <div>
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

          {(props.text && props.text !== undefined &&
            <div dangerouslySetInnerHTML={{ __html: props?.text }}></div>
          )}
        </div>)}
    </div>
  );
};

export default SpCustomCollapsibleText;

