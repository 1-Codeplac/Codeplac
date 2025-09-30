package codeplac.codeplac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import codeplac.codeplac.Model.GalleryModel;

@Repository
public interface GalleryRepository extends JpaRepository<GalleryModel, Long> {

}
