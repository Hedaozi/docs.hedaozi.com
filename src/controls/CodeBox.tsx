import React from 'react';
import {
  Stack,
  Text,
  CommandBarButton,
  IIconProps,
  IStackTokens,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { styles } from '../shared/styles';
import { HighlightCode } from './HighlightCode';

type CodeBoxProps = {
  lang: string;
};

export const CodeBox: React.FC<CodeBoxProps> = ({lang, children}) => {
  const [isCodeVisible, { toggle: toggleIsCodeVisible }] = useBoolean(true);

  const code = `<pre><code class="lang-${lang}">${children}</code></pre>`;

  return (
    <Stack className={"codeBox"}>
      <Stack horizontal horizontalAlign="space-between">
        <Text>代码</Text>
        <Stack horizontal horizontalAlign="end" verticalAlign="end">
          <CommandBarButton
            iconProps={codeIcon}
            text={isCodeVisible ? "隐藏代码" : "显示代码"}
            onClick={toggleIsCodeVisible}
            className={styles.contentBoxButton}
          />
          <CommandBarButton
            iconProps={copyIcon}
            text="复制代码"
            disabled={true}
            className={styles.contentBoxButton}
          />
        </Stack>
      </Stack>
      {
        isCodeVisible ? (
          <Stack className={styles.contentBox + " contentBox"} tokens={codeBoxTokens}>
            <HighlightCode content={code} />
          </Stack>
        ) : (
          <Stack className={styles.contentBoxCollapsed + " contentBox"} />
        )
      }
    </Stack>
  )
}

const codeIcon: IIconProps = { iconName: 'Code' };
const copyIcon: IIconProps = { iconName: 'Copy' };

const codeBoxTokens: IStackTokens = { childrenGap: 0, padding: '10px 10px' };
