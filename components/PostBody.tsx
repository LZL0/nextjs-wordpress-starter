import styles from "@/components/PostBody.module.scss";

interface PostBody {
  content: string;
}

export default function PostBody({ content }: PostBody): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
