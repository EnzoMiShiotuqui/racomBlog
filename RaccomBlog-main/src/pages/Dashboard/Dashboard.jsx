import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocuement';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');
  const [modalOpen, setModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const openModal = (postId) => {
    setPostIdToDelete(postId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPostIdToDelete(null);
  };

  const confirmDelete = () => {
    if (postIdToDelete) {
      deleteDocument(postIdToDelete);
      setModalOpen(false);
      setPostIdToDelete(null);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts </p>
          <Link to="/Posts/Create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/Posts/${post.id}`} className="btn btn-outline">
                    Ver
                  </Link>
                  <Link
                    to={`/Posts/Edit/${post.id}`}
                    className="btn btn-outline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => openModal(post.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Modal */}
      {modalOpen && (
        <>
          <div className={styles.modalBackdrop}></div>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h4>Deseja realmente excluir este post?</h4>
              <div>
                <button onClick={confirmDelete} className="btn btn-outline btn-danger">
                  Confirmar
                </button>
                <button onClick={closeModal} className="btn btn-outline">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
