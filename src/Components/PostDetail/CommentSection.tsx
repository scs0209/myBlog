import CommentForm from '../../Components/CommentForm';
import CommentList from '../../Components/CommentList';
import styles from '../../styles/PostDetail.module.css';

const CommentSection = () => {
  return (
    <section className={`${styles.section} dark:bg-slate-700`}>
      <div className="max-w-4xl mx-auto px-4">
        <CommentForm />
        <CommentList />
      </div>
    </section>
  );
};

export default CommentSection;
