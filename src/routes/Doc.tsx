import {
  Text,
  SearchBox,
  Stack,
  Nav,
  INavLink,
  INavLinkGroup,
  IStackTokens,
  INavStyles,
  useTheme,
  mergeStyles,
  mergeStyleSets,
  NavBase,
} from "@fluentui/react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { ChapterGenerator } from './Chapter';

type DocUrlParams = { 
  docId: string,
};

type ChapterInfo = {
  name: string,
  id: string,
};

type PartInfo = {
  name: string,
  chapters: Array<ChapterInfo>,
};

type DocInfo = {
  title: string,
  parts: Array<PartInfo>,
};

async function getDocInfo(params: DocUrlParams) {
  return (await import(`../docs/${params.docId}/index.json`) as DocInfo);
}

async function getDocIndexInfo(params: DocUrlParams) {
  return (await import(`../docs/${params.docId}/index.md`)).default;
}

export async function docLoader({ params }: { params: any }) {
  return getDocInfo(params);
}

export async function docIndexLoader({ params }: { params: any }) {
  return getDocIndexInfo(params);
}

function OnNavScroll() {

}

export function Doc() {
  let navigate = useNavigate();

  const docInfo = useLoaderData() as DocInfo;

  const navGroups: INavLinkGroup[] = [];

  docInfo.parts.map((part) => {
    const links: INavLink[] = [];

    part.chapters.map((chapter) => {
      links.push({
        name: chapter.name,
        url: chapter.id,
      });
    });

    navGroups.push({
      name: part.name,
      links: links,
    });
  });

  const theme = useTheme();

  const docStyles = mergeStyleSets({
    siteNavScrollWrapper: {
      width: '0px',
      '@media screen and (min-width: 768px)': {
        width: '252px',
      },
      '@media screen and (min-width: 1084px)': {
        width: '324px',
      },
      '@supports (position:sticky)': {
        position: 'sticky',
        top: 0,
        maxHeight: 'calc(100vh - 52px)',
      },
    },
    siteNavWrapper: {
      '@media screen and (min-width: 768px)': {
        paddingTop: '52px',
        paddingRight: '32px',
      },
    },
    trackVertical: {
      right: '5px',
      height: '100%',
    },
    thumb: {
      background: 'rgb(200, 198, 196)',
    },
    siteContent: {
      backgroundColor: theme.palette.neutralLighterAlt,
      position: 'relative',
      width: '100%',
      padding: '20px',
      '@media screen and (min-width: 768px)': {
        maxWidth: 'calc(100% - 252px)',
        width: 'calc(100 % - 252px)',
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '0px',
        paddingBottom: '0px',
      },
      '@media screen and (min-width: 1084px)': {
        maxWidth: 'calc(100% - 324px)',
        width: 'calc(100 % - 324px)',
      },
      '@media screen and (min-width: 1360px)': {
        paddingRight: '0px',
      },
    },

    docTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0px 0px 8px',
      ':first-child': {
        marginTop: '0px',
      },
    },
  });


  return (
    <>
      <Stack className={docStyles.siteNavScrollWrapper}>
        <Stack className={mergeStyles({
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        })}>
          <Stack className={mergeStyles({
            position: 'absolute',
            inset: '0px',
            //overflow: 'scroll',
            overflowY: 'scroll',
            marginRight: '-17px',
            //marginBottom: '-17px',
            //height: 'calc(100% + 17px)',
          })} onScroll={OnNavScroll}>
            <Stack className={docStyles.siteNavWrapper} tokens={siteNavWrapperTokens}>
              <Text as={'h3'} className={docStyles.docTitle}>
                {docInfo.title}
              </Text>
              <SearchBox placeholder="Search" underlined={true} />
              <Nav
                styles={navStyles}
                groups={navGroups}
                onLinkClick={(ev, item) => {
                  ev?.preventDefault();
                  navigate(item?.url as string);
                }}
              />
            </Stack>
          </Stack>
          <Stack className={`${docStyles.trackVertical} ${mergeStyles({
            position: 'absolute',
            width: '6px',
            transition: 'opacity 200ms ease 0s',
            opacity: '0',
            ':hover': {
              opacity: '1',
            }
          })}`}>
            <Stack className={`${docStyles.thumb} ${mergeStyles({
              position: 'relative',
              display: 'block',
              width: '100%',
              height: '100%',
              transform: 'translateY(0px)',
              borderRadius: '6px',
            })}`}>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      
      <Stack id="content" horizontal className={docStyles.siteContent}>
        <Outlet />
      </Stack>
    </>
  );
}

export function DocIndex() {
  return ChapterGenerator(useLoaderData() as string);
};

const siteNavWrapperTokens: IStackTokens = {
  childrenGap: 'm',
};

const navStyles: Partial<INavStyles> = {
  root: {
    overflow: 'hidden',
  },
  chevronButton: {
    borderBottom: '0px',
    fontSize: '14px',
    fontWeight: '600',
    height: '37px',
    marginTop: '0px',
    marginBottom: '8px',
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  groupContent: {
    marginBottom: '0px',
  },
  navItems: {
    paddingLeft: '16px',
  },
  navItem: {
    height: '37px',
  },
  compositeLink: {
    height: '37px',
    '< div.is-selected': {
      background: 'black',
    },
  },
  link: {
    lineHeight: '37px',
    paddingLeft: '25px',
    height: '37px',
    ':after': {
      borderLeft: '0px',
    },
    ':hover': {
      background: 'black',
    },
  },
  linkText: {
    marginLeft: '0px',
    marginRight: '0px',
    //color: 'blue',
  },
};
