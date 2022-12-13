import {
  useRouteError,
} from "react-router-dom";
import {
  Stack,
  Text
} from "@fluentui/react";

export function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <Stack id="error-page" horizontalAlign="center" verticalAlign="center">
      <h1>哎鸭！</h1>
      <Text>抱歉，发生了意外错误。</Text>
      <Text>通常情况下这是由于输入了错误的URL。</Text>
      <Text>按F12在控制台输出中查看错误。</Text>
    </Stack>
  );
}
