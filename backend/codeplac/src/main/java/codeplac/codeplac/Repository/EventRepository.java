package codeplac.codeplac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import codeplac.codeplac.Model.EventModel;

public interface EventRepository extends JpaRepository<EventModel, Integer> {

}