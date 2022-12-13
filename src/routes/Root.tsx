import {
  useLoaderData,
} from 'react-router-dom';
import {
  Stack,
  DocumentCard,
  IStackTokens,
  IIconProps,
  mergeStyles,
  IStyleSet,
  Label,
  ILabelStyles,
  Pivot,
  PivotItem,
} from "@fluentui/react";
import {
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardImage,
  DocumentCardDetails,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
} from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';

interface indexInfo {
  people: IDocumentCardActivityPerson[],
  series: seriesInfo[],
};

interface seriesInfo {
  name: string,
  docs: docInfo[],
};

interface docInfo {
  href: string,
  title: string,
  activity: string,
  people: number[],
};

async function getIndex() {
  return await import(`../docs/index.json`);
}

export async function rootLoader() {
  return getIndex();
}

export function Root() {
  const index = useLoaderData() as indexInfo;
  const people = index.people;

  return (
    <Stack className={mergeStyles({ width: '100%' })}>
      {index.series.map((series) => (
        <Stack>
          <h1>{series.name}</h1>
          <Stack horizontal wrap tokens={seriesToken}>
            {series.docs.map((doc) => (
              <DocumentCard styles={cardStyles} onClickHref={doc.href} >
                <DocumentCardImage height={documentCardImageHeight} imageFit={ImageFit.cover} iconProps={oneNoteIconProps} />
                <DocumentCardDetails>
                  <DocumentCardTitle title={doc.title} shouldTruncate />
                </DocumentCardDetails>
                <DocumentCardActivity activity={doc.activity} people={doc.people.map((pid) => (people[pid]))} />
              </DocumentCard>)
            )}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

const seriesToken: IStackTokens = { childrenGap: 's1', }

const documentCardImageHeight = 150;

const oneNoteIconProps: IIconProps = {
  iconName: 'OneNoteLogo',
  styles: {
    root: {
      color: '#813a7c',
      fontSize: '100px',
      width: '100px',
      height: '100px'
    }
  },
};

const cardStyles: IDocumentCardStyles = {
  root: {
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '20px',
    width: '280px',
  },
};
