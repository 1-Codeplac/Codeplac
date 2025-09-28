package codeplac.codeplac.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import codeplac.codeplac.Model.GalleryModel;
import codeplac.codeplac.Repository.GalleryRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class GalleryService {
    private final GalleryRepository galleryRepository;

    // Diretório onde as imagens serão salvas
    private final String uploadDir = "uploads/gallery";

    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    // Salva a imagem enviada no diretório e registra no banco de dados.
    public GalleryModel saveImage(MultipartFile file) throws IOException {
        // Gera um nome único para o arquivo
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);

        // Cria o diretório caso não exista
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Salva o arquivo no diretório
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Cria a URL para acessar a imagem
        String imageUrl = "/gallery/" + fileName;
        GalleryModel newImage = new GalleryModel(imageUrl);
        return galleryRepository.save(newImage);
    }

    // Remove a imagem do banco de dados pelo ID.
    public void deleteImage(Long imageId) {
        galleryRepository.deleteById(imageId);
    }
}
