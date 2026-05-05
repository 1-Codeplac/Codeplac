package codeplac.codeplac.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import codeplac.codeplac.Exception.Excecao;
import codeplac.codeplac.Model.RankingModel;
import codeplac.codeplac.Service.RankingService;

@RestController
@RequestMapping("/ranking")
public class RankingController {

  @Autowired
  private RankingService rankingService;

  @PostMapping("/create")
  public ResponseEntity<RankingModel> criarRanking(@RequestBody RankingModel ranking) {
    return new ResponseEntity<>(rankingService.createRanking(ranking), HttpStatus.CREATED);
  }

  @GetMapping("/list")
  public ResponseEntity<List<RankingModel>> listarRankings() {
    return new ResponseEntity<>(rankingService.getAllRankings(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<RankingModel> obterRanking(@PathVariable int id) {
    try {
      return new ResponseEntity<>(rankingService.getRankingById(id), HttpStatus.OK);
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  @PutMapping("/modify/{id}")
  public ResponseEntity<RankingModel> modificarRanking(@PathVariable int id, @RequestBody RankingModel ranking) {
    try {
      return new ResponseEntity<>(rankingService.updateRanking(id, ranking), HttpStatus.OK);
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage(), e);
    }
  }

  @DeleteMapping("/destroy/{id}")
  public ResponseEntity<Void> apagarRanking(@PathVariable int id) {
    try {
      boolean deleted = rankingService.deleteRegistration(id);
      if (deleted) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
    } catch (Excecao e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
    }
  }

}
