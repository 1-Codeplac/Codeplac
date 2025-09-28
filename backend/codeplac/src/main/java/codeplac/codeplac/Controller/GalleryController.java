package codeplac.codeplac.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import codeplac.codeplac.Service.GalleryService;
import java.io.IOException;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    // Endpoint para upload de imagem na galeria.
    // Apenas administradores podem acessar.
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            galleryService.saveImage(file);
            return ResponseEntity.ok("Imagem adionada com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erro ao adicionar a imagem: " + e.getMessage());
        }
    }

    // Endpoint para remover uma imagem da galeria pelo ID.
    // Apenas administradores podem acessar.
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Long imageId) {
        galleryService.deleteImage(imageId);
        return ResponseEntity.ok("Imagem removida com sucesso!");
    }

}
