package ssafy.backend.afterglow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.backend.afterglow.domain.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Integer> {

}
