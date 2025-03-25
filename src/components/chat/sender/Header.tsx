import { CloudUploadOutlined } from "@ant-design/icons";
import { Sender as AntdSender, Attachments } from "@ant-design/x";
import { Flex, Form, message, UploadFile, Upload as AntdUpload } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useState } from "react";
import Buttons from "./buttons";
import Upload from "./buttons/Upload";
import { fetchFileTypes } from "@/apis/glossary";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { invoke } from "@tauri-apps/api/core";
import { FileMeta } from "@/apis/types";

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    border-width: 0;
    background-color: ${token.colorBgContainer};
    padding: 0 0;
    min-height: 72px;
  `,
  header: css`
    border-width: 0;
    height: 72px;
    padding-block: 0 !important;
    background-color: ${token.colorBgContainer} !important;
  `,
  content: css`
    padding: 0 !important;
  `,
  title: css`
    height: 100%;
    justify-content: space-between;
    button {
      font-weight: 700;
      height: 36px;
    }
  `,
  attachments: css`
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) !important;
  `,
  attachmentsFull: css`
    max-height: 200px;
    transition:
      max-height 0.5s ease-in-out,
      padding 0.2s ease-in-out !important;
    padding: 16px;
  `,
}));

type GetRef<T> =
  T extends React.ForwardRefExoticComponent<infer P>
    ? P extends React.RefAttributes<infer R>
      ? R
      : never
    : never;

const Header = ({
  senderRef,
  attachmentsRef,
  onFilesChange,
}: {
  senderRef: React.RefObject<GetRef<typeof AntdSender> | null>;
  attachmentsRef: React.RefObject<GetRef<typeof Attachments> | null>;
  onFilesChange: (options: UploadRequestOption) => Promise<void>;
}) => {
  const { styles } = useStyles();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [supportedFileTypes, setSupportedFileTypes] = useState<
    Record<string, string[]>
  >({});
  const form = Form.useFormInstance();

  const [messageApi, contextHolder] = message.useMessage();

  const uploading: boolean = Form.useWatch("uploading", form) || false;

  useEffect(() => {
    fetchFileTypes().then((res) => {
      setSupportedFileTypes(res.data);
    });

    let unsubscribe = () => {};

    const setupDragDrop = async () => {
      if (uploading) {
        unsubscribe = await getCurrentWebview().onDragDropEvent(
          async (event) => {
            if (
              event?.payload?.type === "drop" &&
              event?.payload?.paths?.length > 0
            ) {
              await Promise.all(
                event.payload.paths.map(async (path) => {
                  const mimeType = await invoke<string>("guess_mime_type", {
                    path,
                  });
                  return attachmentsRef.current?.upload(
                    new File([], path.split("/").pop() ?? "", {
                      type: mimeType,
                    }),
                  );
                }),
              );
            }
          },
        );
      }
    };

    setupDragDrop();

    // 返回清理函数
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [uploading]);

  // 文件上传前的验证处理
  const handleBeforeUpload = (file: File, fileList: File[]) => {
    if (files.length + fileList.length > 3) {
      messageApi.error("最多上传3个文件");
      return false || AntdUpload.LIST_IGNORE;
    }

    if (file.size > 1024 * 1024 * 3) {
      messageApi.error("文件大小不能超过3M");
      return false || AntdUpload.LIST_IGNORE;
    }
    const fileType = file.type.split("/")[0];
    const fileNameType = file.name.split(".").pop();
    const supportedFileSuffixes = supportedFileTypes[fileType];
    if (
      !supportedFileSuffixes ||
      !supportedFileSuffixes.includes(fileNameType ?? "")
    ) {
      messageApi.error(
        `不支持的文件类型, type: ${file.type}, suffix: ${fileNameType}`,
      );
      return false || AntdUpload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <>
      {contextHolder}
      <AntdSender.Header
        forceRender
        closable={false}
        className={styles.container}
        classNames={{
          header: styles.header,
          content: styles.content,
        }}
        title={
          <Flex gap={12} align="center" className={styles.title}>
            <Flex gap={12}>
              <Form.Item noStyle name="uploading">
                <Upload type="text" />
              </Form.Item>
            </Flex>
            <Flex gap={12}>
              <Form.Item noStyle name="thinking">
                <Buttons.Thinking
                  style={{ borderRadius: "9999px" }}
                  children={"思考"}
                />
              </Form.Item>
              <Form.Item noStyle name="deepSearch">
                <Buttons.DeepSearch
                  children={"深度搜索"}
                  style={{ borderRadius: "9999px" }}
                />
              </Form.Item>
            </Flex>
          </Flex>
        }
      >
        <div
          className={`${styles.attachments} ${uploading && styles.attachmentsFull}`}
        >
          <Attachments
            multiple={true}
            customRequest={onFilesChange}
            ref={attachmentsRef}
            styles={{
              placeholder: {
                padding: 0,
              },
            }}
            items={files}
            onChange={async ({ fileList }) => {
              const files = fileList.map(
                (file: UploadFile & { metadata?: FileMeta }) => {
                  return {
                    uid: file.uid,
                    name: file.name,
                    status: file.status,
                    lastModifiedTime: file.lastModifiedDate?.toUTCString(),
                    metadata: file.metadata ?? file.response,
                    type: file.type,
                  };
                },
              );
              setFiles(files);
              form.setFieldValue("files", files);
            }}
            beforeUpload={handleBeforeUpload}
            placeholder={(type) =>
              type === "drop"
                ? {
                    title: "Drop file here",
                  }
                : {
                    icon: <CloudUploadOutlined />,
                    title: "Upload files",
                    description: "Click or drag files to this area to upload",
                  }
            }
            getDropContainer={() => senderRef.current?.nativeElement}
          />
        </div>
      </AntdSender.Header>
    </>
  );
};

export default Header;
