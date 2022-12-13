import React, { FormEvent, useState } from 'react';
import {
  Stack,
  Text,
  Image,
  CommandBarButton,
  DefaultButton,
  PrimaryButton,
  FocusTrapCallout,
  FocusZone,
  FocusZoneTabbableElements,
  ChoiceGroup,
  IChoiceGroupOption,
  ImageFit,
  IIconProps,
  IImageProps,
  IStackTokens,
  Separator,
} from '@fluentui/react';
import flowChart from '../dsg-python-tutorial/images/python-to-excel-args-selection.png';
import { useBoolean } from '@fluentui/react-hooks';
import { styles} from '../../shared';
import { HighlightCode } from '../../controls';
import { Card } from '../../controls/Card';

export const Pandas = () => {
  const [isFlowChartVisible, { toggle: toggleIsFlowChartVisible }] = useBoolean(false);
  const [isCodeVisible, { toggle: toggleIsCodeVisible }] = useBoolean(true);
  const [isCodeCalloutVisible, { toggle: toggleIsCodeCalloutVisible }] = useBoolean(false);
  const [pandasCode, setPandasCode] = useState(
    `<pre><code class="lang-python">${codeDict.pandas.default}</Text></pre>`
  );

  const codeCalloutButtonId = 'CodeCalloutButton';

  var sheetsNum: string | undefined;
  var workbookAppend: string | undefined;
  var sheetExists: string | undefined;

  const GenPandasCode = () => {
    var code = codeDict.pandas.import + '\n';
    if (typeof sheetExists === 'string') {
      switch (sheetExists) {
        case 'error': code += codeDict.pandas.branch3; break;
        case 'new': code += codeDict.pandas.branch4; break;
        case 'replace': code += codeDict.pandas.branch5; break;
        case 'overlay': code += codeDict.pandas.branch6; break;
      }
    }
    else if (typeof workbookAppend === 'string') {
      if (workbookAppend === 'w') {
        code += sheetsNum === 'Single' ?
          codeDict.pandas.branch1 :
          codeDict.pandas.branch2;
      }
      else {
        code += codeDict.pandas.branch3 + '\n' +
          codeDict.pandas.branch4 + '\n' +
          codeDict.pandas.branch5 + '\n' +
          codeDict.pandas.branch6;
      }
    }
    else {
      if (typeof sheetsNum === 'undefined') {
        code += codeDict.pandas.branch1 + '\n' +
          codeDict.pandas.branch2 + '\n' +
          codeDict.pandas.branch3 + '\n' +
          codeDict.pandas.branch4 + '\n' +
          codeDict.pandas.branch5 + '\n' +
          codeDict.pandas.branch6;
      }
      else if (sheetsNum === 'Single') {
        code += codeDict.pandas.branch1 + '\n' +
          codeDict.pandas.branch3 + '\n' +
          codeDict.pandas.branch4 + '\n' +
          codeDict.pandas.branch5 + '\n' +
          codeDict.pandas.branch6;
      }
      else {
        code += codeDict.pandas.branch2 + '\n' +
          codeDict.pandas.branch3 + '\n' +
          codeDict.pandas.branch4 + '\n' +
          codeDict.pandas.branch5 + '\n' +
          codeDict.pandas.branch6;
      }
    }
    setPandasCode(`<pre><code class="lang-python">${code}</Text></pre>`);
  };

  const PandasCodeOptions = () => {
    const [isWorkbookAppendVisible, { toggle: toggleIsWorkbookAppendVisible }] = useBoolean(false);
    const [isSheetExistsVisible, { toggle: toggleIsSheetExistsVisible }] = useBoolean(false);

    const [sheetsNumKey, setSheetsNumKey] = React.useState<string | undefined>(undefined);
    const [workbookAppendKey, setWorkbookAppendKey] = React.useState<string | undefined>(undefined);
    const [sheetExistsKey, setSheetExistsKey] = React.useState<string | undefined>(undefined);

    const sheetsNumOptions: IChoiceGroupOption[] = [
      { key: 'Single', text: '单工作表' },
      { key: 'Multiple', text: '多工作表' },
    ];
    const workbookAppendOptions: IChoiceGroupOption[] = [
      { key: 'w', text: '覆盖' },
      { key: 'a', text: '追加' },
    ];
    const sheetExistsOptions: IChoiceGroupOption[] = [
      { key: 'error', text: '抛出异常' },
      { key: 'new', text: '新建工作表' },
      { key: 'replace', text: '覆盖工作表' },
      { key: 'overlay', text: '修改工作表' },
    ];

    var isWorkbookAppendVisibleVar = false;
    var isSheetExistsVisibleVar = false;

    const sheetsNumOnChange = React.useCallback((ev: FormEvent<HTMLElement | HTMLInputElement> | undefined, option: IChoiceGroupOption | undefined) => {
      setSheetsNumKey((option as IChoiceGroupOption).key);
      if (!isWorkbookAppendVisibleVar) {
        toggleIsWorkbookAppendVisible();
        isWorkbookAppendVisibleVar = !isWorkbookAppendVisibleVar;
      }
    }, []);
    const workbookAppendOnChange = React.useCallback((ev: FormEvent<HTMLElement | HTMLInputElement> | undefined, option: IChoiceGroupOption | undefined) => {
      var key = (option as IChoiceGroupOption).key;
      setWorkbookAppendKey(key);
      if (!isSheetExistsVisibleVar && key == 'a') {
        isSheetExistsVisibleVar = true;
        toggleIsSheetExistsVisible();
      }
      if (isSheetExistsVisibleVar && key == 'w') {
        isSheetExistsVisibleVar = false;
        toggleIsSheetExistsVisible();
      }
    }, []);
    const sheetExistsOnChange = React.useCallback((ev: FormEvent<HTMLElement | HTMLInputElement> | undefined, option: IChoiceGroupOption | undefined) => {
      setSheetExistsKey((option as IChoiceGroupOption).key);
    }, []);
    const filterCode = () => {
      sheetsNum = sheetsNumKey;
      workbookAppend = workbookAppendKey;
      sheetExists = sheetExistsKey;
      GenPandasCode();
      toggleIsCodeCalloutVisible();
    }

    return (
      <FocusTrapCallout
        role="alertdialog"
        className={styles.callout}
        gapSpace={0}
        target={`#${codeCalloutButtonId}`}
        onDismiss={toggleIsCodeCalloutVisible}
        setInitialFocus
      >
        <ChoiceGroup
          selectedKey={sheetsNumKey}
          options={sheetsNumOptions}
          onChange={sheetsNumOnChange}
          label="工作表数量"
        />
        {isWorkbookAppendVisible ? (
          <Stack>
            <Separator />
            <ChoiceGroup
              selectedKey={workbookAppendKey}
              options={workbookAppendOptions}
              onChange={workbookAppendOnChange}
              label="写入模式"
            />
          </Stack>
        ): null}
        {isSheetExistsVisible ? (
          <Stack>
            <Separator />
            <ChoiceGroup
              selectedKey={sheetExistsKey}
              options={sheetExistsOptions}
              onChange={sheetExistsOnChange}
              label="重复行为"
            />
          </Stack>
        ): null }
        <FocusZone handleTabKey={FocusZoneTabbableElements.all} isCircularNavigation>
          <Stack className={styles.buttons} gap={8} horizontal>
            <PrimaryButton onClick={filterCode}>确认</PrimaryButton>
            <DefaultButton onClick={toggleIsCodeCalloutVisible}>取消</DefaultButton>
          </Stack>
        </FocusZone>
      </FocusTrapCallout>
    );
  }

  function Diagram() {
    return (
      <Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>决策流程图</Text>
          <Stack horizontal horizontalAlign="end" verticalAlign="end">
            <CommandBarButton
              iconProps={flowChartIcon}
              text={isFlowChartVisible ? "隐藏流程图" : "显示流程图"}
              onClick={toggleIsFlowChartVisible}
              className={styles.contentBoxButton}
            />
          </Stack>
        </Stack>
        {isFlowChartVisible ? (
          <Stack className={styles.contentBox} tokens={contentBoxTokens}>
            <Image {...imageProps} src={flowChart} styles={({ root: { alignSelf: 'center' } })} />
          </Stack>
        ) : (
          <Stack className={styles.contentBoxCollapsed} />
        )}
      </Stack>
    );
  }

  function PandasCodeBox() {
    return (
      <Stack>
        <Stack horizontal horizontalAlign="space-between">
          <Text>代码</Text>
          <Stack horizontal horizontalAlign="end" verticalAlign="end">
            <CommandBarButton
              id={codeCalloutButtonId}
              iconProps={filterIcon}
              text="选择情境"
              onClick={toggleIsCodeCalloutVisible}
              className={styles.contentBoxButton}
            />
            {isCodeCalloutVisible ? (<PandasCodeOptions />) : null}
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
        {isCodeVisible ? (
          <Stack className={styles.contentBox} tokens={codeBoxTokens}>
            <HighlightCode content={pandasCode} />
          </Stack>
        ) : (
          <Stack className={styles.contentBoxCollapsed} />
        )}
      </Stack>
    );
  }

  return (
    <Card>
      <Diagram />
      <PandasCodeBox/>
    </Card>
  );
}


export const imageProps: IImageProps = { imageFit: ImageFit.contain, };

const flowChartIcon: IIconProps = { iconName: 'FlowChart' };
const filterIcon: IIconProps = { iconName: 'Filter' };
const codeIcon: IIconProps = { iconName: 'Code' };
const copyIcon: IIconProps = { iconName: 'Copy' };

const contentBoxTokens: IStackTokens = { childrenGap: 0, padding: 10 };
const codeBoxTokens: IStackTokens = { childrenGap: 0, padding: '10px 10px' };

const codeDict = {
  pandas: {
    import: `from pandas import DataFrame, ExcelWriter
df_test = DataFrame({
    'colA': [1, 2], 
    'colB': [3, 4]
})
`,
    branch1: `# 单表+覆盖文件
df_test.to_excel(
    'test.xlsx', 
    sheet_name = 'test'
)
`,
    branch2: `# 多表+覆盖文件
with ExcelWriter('test.xlsx') as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test a'
    )
    df_test.to_excel(
        writer, 
        sheet_name = 'test b'
    )
`,
    branch3: `# 修改现有文件，若Sheet已存在则抛出异常
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )
`,
    branch4: `# 修改现有文件，若Sheet已存在则保留原Sheet，并在新Sheet中写入内容
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'new'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )
`,
    branch5: `# 修改现有文件，若Sheet已存在则覆盖原Sheet
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'replace'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )
`,
    branch6: `# 修改现有文件，若Sheet已存在则在指定单元格上覆盖，区域外内容不会被修改
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'overlay'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test', 
        startrow = 3, 
        startcol = 3
    )
`,
    default: `from pandas import DataFrame, ExcelWriter
df_test = DataFrame({
    'colA': [1, 2], 
    'colB': [3, 4]
})

# 单表+覆盖文件
df_test.to_excel(
    'test.xlsx', 
    sheet_name = 'test'
)

# 多表+覆盖文件
with ExcelWriter('test.xlsx') as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test a'
    )
    df_test.to_excel(
        writer, 
        sheet_name = 'test b'
    )

# 修改现有文件，若Sheet已存在则抛出异常
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )

# 修改现有文件，若Sheet已存在则保留原Sheet，并在新Sheet中写入内容
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'new'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )

# 修改现有文件，若Sheet已存在则覆盖原Sheet
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'replace'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test'
    )

# 修改现有文件，若Sheet已存在则在指定单元格上覆盖，区域外内容不会被修改
with ExcelWriter(
    'test.xlsx', 
    mode = 'a', 
    engine = 'openpyxl', 
    if_sheet_exists = 'overlay'
) as writer:
    df_test.to_excel(
        writer, 
        sheet_name = 'test', 
        startrow = 3, 
        startcol = 3
    )
`
  }
}
