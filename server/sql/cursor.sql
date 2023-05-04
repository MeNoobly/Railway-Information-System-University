-- ПОСМОТРЕТЬ, СКОЛЬКО ЗОЛОТЫХ БИЛЕТОВ ПРОДАНО
DO $$
	DECLARE 
		my_cursor CURSOR FOR SELECT ticket_id FROM tickets WHERE code = 'GOLDEN_TICKET';
		rec TEXT;
	
	BEGIN
		OPEN my_cursor;
		
		FETCH NEXT FROM my_cursor INTO rec;

		WHILE FOUND
		LOOP
		   RAISE NOTICE '%', rec;
		   FETCH NEXT FROM my_cursor INTO rec;
		END LOOP;

		CLOSE my_cursor;
	END;
$$