import { useLoaderData } from "react-router-dom";
import {
  Text,
  Link,
  Nav,
  Stack,
  INavLinkGroup,
  IStackTokens,
  INavStyles,
  mergeStyles,
  mergeStyleSets
} from '@fluentui/react';
import { Card } from '../controls/Card';
import { MdRender } from '../controls/MdRender';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';

type ChapterUrlParams = {
  docId: string,
  chapterId: string,
}

async function getChapterInfo(params: ChapterUrlParams) {
  return (await import(`../docs/${params.docId}/${params.chapterId}.md`)).default;
}

export async function chapterLoader({ params }: { params: any }) {
  return getChapterInfo(params);
}

export function ChapterGenerator(md: string) {
  const tree = fromMarkdown(md);

  const title: typeof tree[] = [];
  const heading2Ranges: typeof tree[] = [];
  const heading2: typeof tree[] = [];
  var currentRangeId = -1;

  tree.children.map((node) => {
    if (node.type == 'heading' && node.depth == 1) {
      title.push({
        type: 'root',
        children: [
          node
        ],
      });
    }
    else if (node.type == 'heading' && node.depth == 2) {
      heading2.push({ type: 'root', children: [node] });
      heading2Ranges.push({ type: 'root', children: [node] });
      currentRangeId++;
    }
    else {
      if (heading2Ranges.length == 0) {
        heading2Ranges.push({ type: 'root', children: [node] });
        currentRangeId++;
      }
      else {
        heading2Ranges[currentRangeId].children.push(node);
      }
    };
  });

  var linkId = 0;
  const navLinks: INavLinkGroup[] = [{ links: [] }];
  heading2.map((heading) => {
    const headingContent = toMarkdown(heading).replace(/## /, '');
    navLinks[0].links.push({
      name: headingContent,
      url: `#card-${linkId++}`,
      key: `card-${linkId}`,
    });
  });
  
  return (
    <Stack className={chapterStyles.page}>
      <Stack id='header' className={chapterStyles.header}>
        <MdRender md={toMarkdown(title[0])} />
      </Stack>
      <Stack className={chapterStyles.main}>
        <Stack className={chapterStyles.sectionWrapper} tokens={sectionWrapperTokens}>
          {heading2Ranges.map((range) => (
            <Card>
              <MdRender md={toMarkdown(range)} />
            </Card>
          ))}
        </Stack>
        <Stack className={chapterStyles.sideRailWrapper}>
          <Stack className={mergeStyles({
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          })}>
            <Stack className={`${chapterStyles.sideRailScrollbarsView} ${mergeStyles({
              position: 'absolute',
              inset: '0px',
              //overflow: 'scroll',
              overflowY: 'scroll',
              marginRight: '-17px',
              //marginBottom: '-17px',
            })}`}>
              <Stack className='FocusZone'>
                <Stack className={chapterStyles.section}>
                  <Text as={'h3'} className={chapterStyles.sectionTitle}>
                    本页导航
                  </Text>
                  {
                    (heading2.length > 0) ?
                      //<ul className={chapterStyles.links}> {
                      //  heading2.map((heading) => (
                      //    <li
                      //      className={`${chapterStyles.linkWrapper} ${chapterStyles.jumpLinkWrapper}`}
                      //      key={`link-${linkId++}`}
                      //    >
                      //      <Link href={`#${toMarkdown(heading).replace(/## /, '')}`}>
                      //        <MdRender md={toMarkdown(heading).replace(/## /, '')} />
                      //      </Link>
                      //    </li>
                      //  ))}
                      //</ul>
                      <Nav
                        styles={navStyles}
                        groups={navLinks}
                        onRenderLink={(item) => (
                          <MdRender md={item?.name as string} />
                        )}
                      /> :
                      <Text>没有更多节</Text>
                  }
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export function Chapter() {
  return ChapterGenerator(useLoaderData() as string);
}

const sectionWrapperTokens: IStackTokens = {
  childrenGap: 'l1 0'
};

export const chapterStyles = mergeStyleSets({
  page: {
    position: 'relative',
    width: '100%',
  },
  header: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '28px',
    position: 'relative',
    '@media only screen and (min-width: 768px)': {
      marginBottom: '0px',
      padding: '52px 0px',
      minHeight: '136px',
    },
    '@media only screen and (min-width: 1360px)': {
      maxWidth: '1080px',
      width: 'calc(100% - 214px)',
    },
  },
  title: {
    alignItems: 'baseline',
    display: 'flex',
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '1',
    margin: '0px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '@media only screen and (min-width: 1360px)': {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  sectionWrapper: {
    maxWidth: '1080px',
    '@media only screen and (min-width: 1360px)': {
      maxWidth: 'calc(100% - 214px)',
      flex: '1 auto',
      paddingBottom: '100px',
    },
  },
  sideRailWrapper: {
    marginTop: '40px',
    marginBottom: '40px',
    width: '0px',
    '@media only screen and (min-width: 1360px)': {
      paddingLeft: '32px',
      marginTop: '0px',
      marginBottom: '0px',
      width: '214px',
      '@supports (position:sticky)': {
        position: 'sticky',
        top: '52px',
        maxHeight: 'calc(100vh - 52px)',
      },
    }
  },
  sideRailScrollbarsView: {
    position: 'relative!important',
    '@media only screen and (min-width: 1360px)': {
      position: 'absolute!important',
      //overflow: 'scroll!important',
      overflowY: 'scroll!important',
    },
  },
  section: {
    marginBottom: '28px',
    ':last-child': {
      marginBottom: '0px',
    },
    ' p': {
      marginTop: '0px',
      marginBottom: '3px',
    }
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    padding: '0px 0px 0px 8px',
    margin: '0px 0px 8px',
    ':first-child': {
      marginTop: '0px',
    },
  },
  linkWrapper: {
    display: 'flex',
    fontSize: '14px',
  },
  jumpLinkWrapper: {
    position: 'relative',
  },
});

const navStyles: Partial<INavStyles> = {
  root: {
    overflow: 'hidden',
  },
  navItems: {
    margin: '0px',
    padding: '0px',
  },
  navItem: {
    display: 'flex',
    fontSize: '14px',
    position: 'relative',
  },
  compositeLink: {
    width: '100%',
  },
  link: {
    paddingLeft: '10px',
    whiteSpace: 'normal',
    lineHeight: 'inherit',
    textAlign: 'left',
  },
  linkText: {
    marginLeft: '0px',
    marginRight: '0px',
  },
};
