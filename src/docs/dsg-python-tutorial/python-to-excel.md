# Python to Excel

Python中有若干能与Excel交互的包，此处使用`pandas`和`openpyxl`。

## Excel结构

完整的Excel结构为Application -> Workbook -> Worksheet -> Range -> Row / Column -> Cell。

- 术语：
  - Application指Excel应用程序；
  - Workbook指Excel工作簿文件，通常扩展名为`.xlsx`或`.xls`；
  - Worksheet为工作簿中的工作表；
  - Range为工作表上的区域，横跨若干行列；
  - Row和Column则是行、列；
  - Cell则是单元格。
- 关系：
  - 电脑上可以打开若干个Application；
  - 每个Application中可以打开若干个Workbook；
  - Workbook中包含若干个Worksheet；
  - Worksheet是数据存储的区域，基本单位为Cell，
  - 而给定左上角和右下角的Cell可以组合成Range，
  - Range横跨若干行列，严格来说单行、单列、甚至单个单元格也属于Range，
  - 但Range本身具有Rows和Columns集合属性，因此一般作为行、列和单元格的组合。

而在Python中，除非在Windows平台下使用`pywin32`包，其他的Excel操作都是以Workbook为根的。
本文将介绍如何使用`pandas`和`openpyxl`写入和修改Excel Workbook文件。

## pandas

由于`pandas`是为数据框设计的，`pandas`仅支持Workbook、Worksheet和Range级别的操作，
并且无法调整边框等格式。`pandas`中写入和修改Excel的主要方法为
[`DataFrame.to_excel()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_excel.html)。
该方法有2个重要参数：

- `excel_writer`：要写入的Excel Workbook；必须，可以是文件路径，也可以是
  [`DataFrame.to_excel()`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.ExcelWriter.html)实例。
- `sheet_name`：要写入的Worksheet；可选，默认为`'Sheet1'`。

需要说明，当`excel_writer`为文件路径时，`pandas`将覆盖该文件，
此时我们生成的Excel Workbook也将只有一个Worksheet。
如果想要生成多Worksheet表格，则必须传入
[`ExcelWriter`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.ExcelWriter.html)实例。
[`ExcelWriter`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.ExcelWriter.html)
实例的构造函数中，有3个参数值得注意：

- `path`：文件的路径；必须。
- `mode`：写入模式；可选，默认为`'w'`（覆盖），其他可选项包括`'a'`（追加）。
  **若文件不存在，选择选项`'a'`会抛出异常。**
- `if_sheet_exists`：写入已存在的Worksheet时的操作，仅当`mode = 'a'`时生效；
  **仅`pandas >= 1.3.0`支持**；
  可选，值可以是以下之一：
  - `'error'`：抛出异常（默认）；
  - `'new'`：生成新Worksheet，名称由程序决定；
  - `'replace'`：删除旧Worksheet；
  - `'overlay'`：直接在原Worksheet的指定位置写入，**仅`pandas >= 1.4.0`支持**。

### 决策流程图

![](https://media.hedaozi.com/docs/dsg-python-tutorial/python-to-excel-args-selection.png)

## openpyxl

相较于`pandas`，`openpyxl`对Excel工作表的操作更为细致，可以完成单元格级别的操作。
使用`openpyxl`包，我们可以更进一步地定制化Excel表格，包括边框格式、字体样式等。
以下我们将以输出回归表格为例。

### 工作表区域

借助区域（Range），我们能更方便地将数据写入工作表的指定区域内。

`openpyxl`未提供直接写入区域的函数/方法，因此需要定义如下工具函数：

``` python
from openpyxl import Workbook
from openpyxl.worksheet.worksheet import Worksheet
from openpyxl.utils import get_column_letter

def write_range_data(
    sheet: Worksheet, 
    data: list, 
    start_row: int = 1, 
    start_col: int = 1
):
    num_rows = len(data)
    num_cols = 0
    for ri in range(0, num_rows):
        row = data[ri]
        wri, num_cols_ = ri + start_row, len(row)
        for ci in range(0, num_cols_):
            cell_str = get_column_letter(ci + start_col) + str(wri)
            sheet[cell_str] = row[ci]
        num_cols = num_cols_ if num_cols_ > num_cols else num_cols
    return (
        (start_row, start_col), 
        (start_row + num_rows - 1, start_col + num_cols - 1)
    )
```

该函数的参数解释如下：

- `sheet`：要写入的工作表对象。
- `data`：要写入的数据，可以是行元组或行列表，其中行是一维元组或列表（可以不等长）。
- `start_row`，`start_col`：写入区域的左上角坐标（注意：行列号从1开始）。

该函数返回区域的范围，以左上角顶点和右下角顶点的坐标表示。

### 样式

样式是格式化的高效工具，包含了一组格式信息。
因此通过样式，我们可以便捷地设置和修改对象的格式。
此外，样式存在继承关系，子样式中未被定义的格式会继承父样式中的对应样式。
而所有样式的基础即是样式“常规”（Normal）。

`openpyxl.styles`也继承了样式继承的理念。
通过`openpyxl.styles`，我们可以设置边框、字体大小、数字格式。
以下我们将演示如何通过`openpyxl.styles`提供的若干样式接口，排版一份回归表格（三线表式）。

#### 边框

`openpyxl`无法像Microsoft Excel一样，实现区域外边框效果。
边框效果只能在单元格层面上实现。
以下我们定义两组单元格格式，分别表示表头和表尾的边框：

``` python
from openpyxl.styles import Border, Side

header_border = Border(
    top = Side(border_style = 'thick'),
    bottom = Side(border_style = 'medium')
)

footer_border = Border(
    top = Side(border_style = 'thick')
)
```

#### 字体

定义表头、表体和注释的字体样式：

``` python
from openpyxl.styles import Font
from copy import copy

body_font = Font(
    name = 'Times New Roman',
    size = 10.5
)

header_font = copy(body_font)
header_font.bold = True

caption_font = copy(body_font)
caption_font.size = 10
caption_font.italic = True
```

#### 对齐方式

定义表头、表体（数字）、表体（行名称）和注释的对齐样式：

``` python
from openpyxl.styles import Alignment
from copy import copy

body_align = Alignment(
    horizontal = 'center',
    vertical = 'center'
)

header_align = copy(body_align)

row_index_align = copy(body_align)
row_index_align.horizontal = 'left'

caption_align = copy(row_index_align)
```

#### 工具函数

为方便设置样式，我们定义一个用于设置区域内所有单元格的工具函数：

``` python
def apply_style_to_range(
    sheet: Worksheet, 
    range_coord: tuple, 
    border_style: Border = None, 
    font_style: Font = None, 
    align_style: Alignment = None
):
    ((start_row, start_col), (end_row, end_col)) = range_coord
    for row in range(start_row, end_row + 1):
        for col in range(start_col, end_col + 1):
            cell_str = get_column_letter(col) + str(row)
            if border_style != None:
                sheet[cell_str].border = border_style
            if font_style != None:
                sheet[cell_str].font = font_style
            if align_style != None:
                sheet[cell_str].alignment = align_style
```

该函数的参数解释如下：

- `sheet`：要写入的工作表对象。
- `range_coord`：区域坐标。
- `border_style`：边框样式（可选）。
- `font_style`：字体样式（可选）。
- `align_style`：对齐样式（可选）。

### 例子

以下是输出回归表格的例子：

``` python
# 新建工作簿
wb = Workbook()

# 使用当前活动表格，并设置名称
reg_sheet = wb.active
reg_sheet.title = 'reg'

# 要写入的数据
range_data = [
    ['Predict vars', 'Model 1'],
    ['Weight', '-0.007***'],
    ['', '(0.000)'],
    ['Foreign', '-1.650'],
    ['', '(1.076)'],
    ['Constant', '41.680***'],
    ['', '(2.166)'],
    ['R-square', '0.663'],
    ['* < 0.05, ** < 0.01, *** < 0.001; \nStandard errors in parentheses.']
]

# 将数据写入，并获取区域坐标
((start_row, start_col), (end_row, end_col)) = write_range_data(
    reg_sheet,
    range_data
)

# 设置表头格式
header_range = ((start_row, start_col), (start_row, end_col))
apply_style_to_range(
    reg_sheet, 
    header_range, 
    border_style = header_border,
    font_style = header_font,
    align_style = header_align
)

# 设置行名称格式
row_index_range = ((start_row + 1, start_col), (end_row - 1, start_col))
apply_style_to_range(
    reg_sheet, 
    row_index_range, 
    font_style = body_font,
    align_style = row_index_align
)

# 设置表体格式
body_range = ((start_row + 1, start_col + 1), (end_row - 1, end_col))
apply_style_to_range(
    reg_sheet, 
    body_range, 
    font_style = body_font,
    align_style = body_align
)

# 设置注释格式，并合并注释单元格为一行
caption_range = ((end_row, start_col), (end_row, end_col))
apply_style_to_range(
    reg_sheet, 
    caption_range, 
    border_style = footer_border,
    font_style = caption_font,
    align_style = caption_align
)
reg_sheet.merge_cells(
    start_row = caption_range[0][0], 
    start_column = caption_range[0][1], 
    end_row = caption_range[1][0], 
    end_column = caption_range[1][1]
)

wb.save(filename = 'outreg.xlsx')
```
