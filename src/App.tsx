import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as Routes from "./routes";
import {
  Text,
  Link,
  Image,
  ChoiceGroup,
  CommandBarButton,
  Stack,
  Callout,
  IChoiceGroupOption,
  IIconProps,
  ILinkStyles,
  mergeStyleSets,
  ThemeProvider,
  useTheme,
} from '@fluentui/react';
import {
  useBoolean,
  useId
} from '@fluentui/react-hooks';
import { darkTheme, lightTheme, classicDarkTheme, classicLightTheme } from './shared/Themes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Routes.Root />,
    loader: Routes.rootLoader,
    errorElement: <Routes.Error />,
  },
  {
    path: '/docs/:docId',
    element: <Routes.Doc />,
    loader: Routes.docLoader,
    errorElement: <Routes.Error />,
    children: [
      {
        path: '/docs/:docId',
        loader: Routes.docIndexLoader,
        element: <Routes.DocIndex />,
        errorElement: <Routes.Error />,
      },
      {
        path: '/docs/:docId/:chapterId',
        loader: Routes.chapterLoader,
        element: <Routes.Chapter />,
        errorElement: <Routes.Error />,
      },
    ],
  },
  {
    path: '/about',
    element: <Routes.About />,
  },
]);

export default function App() {
  function _onChange(
    ev: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option: IChoiceGroupOption | undefined
  ): void {
    toggleIsLight();
    toggleIsCalloutVisible();
  }

  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const [isLight, { toggle: toggleIsLight }] = useBoolean(true);
  const buttonId = useId('theme-button');

  const theme = useTheme();
  const themeIcon: IIconProps = { iconName: "Contrast", color: theme.palette.black };
  const siteLinkStyle: ILinkStyles = {
    root: {
      color: theme.palette.neutralSecondary,
      texeDecorationColor: theme.palette.neutralSecondary,
      textUnderlineOffset: '0.4em',
      ':link': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':visited': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':hover': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
      ':focus': {
        texeDecorationColor: theme.palette.neutralSecondary,
      },
    },
  };

  const styles = mergeStyleSets({
    // root
    siteRoot: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    siteWrapper: {
      width: '100%',
      maxWidth: '1722px',
      flexGrow: '1',
      position: 'relative',
      display: 'flex',
      '@media screen and (min-width: 768px)': {
        paddingLeft: '32px',
        paddingRight: '32px',
        flexDirection: 'row',
        justifyContent: 'center',
      },
    },
    //header
    header: {
      borderBottom: '1px solid',
      borderBottomColor: isLight ? '#e9e8e7' : '#676869',
    },
    siteLinkBorder: {
      borderLeft: '2px solid',
      borderLeftColor: isLight ? '#000000' : '#ffffff',
      height: '25px',
    },
    // footer
    footer: {
      background: isLight ? theme.palette.neutralLighter : '#282726',
    },
    callout: {
      padding: '10px 30px 20px 20px',
      background: theme.palette.black,
    },
    themeIcon: {
      padding: '10px',
      background: 'transparent',
      ':hover': {
        background: isLight ? theme.palette.neutralLight : '#323130',
      },
    },
  });

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <Stack horizontal verticalAlign="center" className={styles.header} tokens={tokens.header}>
        <Link href="hedaozi.com">
          <Image src={isLight ? urls.siteLogo.light : urls.siteLogo.dark} height="35px" />
        </Link>
        <Stack horizontal className={styles.siteLinkBorder} verticalAlign="center" tokens={tokens.siteLogo}>
          <Link href="/" styles={siteLinkStyle}>
            <Text variant="large">
              HEDAOZI.DOC
            </Text>
          </Link>
        </Stack>
      </Stack>
      <Stack className={styles.siteRoot}>
        <Stack horizontal className={styles.siteWrapper}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </Stack>
      </Stack>
      <Stack wrap={true} horizontal horizontalAlign="space-between" verticalAlign="center" tokens={tokens.footer} className={styles.footer}>
        <>
          <CommandBarButton id={buttonId} iconProps={themeIcon} text={"颜色主题"} onClick={toggleIsCalloutVisible} className={styles.themeIcon} />
          {isCalloutVisible && (
            <Callout role="dialog" setInitialFocus onDismiss={toggleIsCalloutVisible} target={`#${buttonId}`} className={styles.callout}>
              <ChoiceGroup defaultSelectedKey={isLight ? "light" : "dark"} options={options} onChange={_onChange} />
            </Callout>
          )}
        </>
        <Stack wrap={true} horizontal verticalAlign="center" tokens={tokens.copyright}>
          <Link href={urls.beian.gongan}>
            <Stack horizontal tokens={tokens.beian}>
              <Image src={urls.beian.gonganLogo} />
              <Text>
                陕公网安备61010302000815号
              </Text>
            </Stack>
          </Link>
          <Link href={urls.beian.icp}>
            <Stack horizontal>
              <Text>
                陕ICP备2021012279号-1
              </Text>
            </Stack>
          </Link>
          <Text>
            © 2021-2022 何凌锋 版权所有
          </Text>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

const options: IChoiceGroupOption[] = [
  { key: 'light', text: '浅色主题' },
  { key: 'dark', text: '深色主题' },
];

const urls = {
  siteLogo: {
    light: 'https://media.hedaozi.com/sitelogo/150x60.png',
    dark: 'https://media.hedaozi.com/sitelogo/150x60_white.png',
  },
  beian: {
    gonganLogo: 'https://media.hedaozi.com/logos/GongAnBeiAn.png',
    gongan: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61010302000815',
    icp: 'https://beian.miit.gov.cn/',
  },
};

const tokens = {
  header: { padding: 's1 m', childrenGap: 'l1', },
  siteLogo: { padding: '0 l1', },
  footer: { padding: 'l2', },
  copyright: { childrenGap: 'm', },
  beian: { childrenGap: 's2', },
};
