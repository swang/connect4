var connect4
if (!connect4) connect4 = {} 


connect4.interface = function() {
	var	theGameBoard = new connect4.system(),
	    inAnimation = false,
	    currentPlayer = theGameBoard.disc().red
	    
	    
	function createBoard() {
		$('body').append('<div id="game_board"></div>')
		
		for ( var r = 0; r < theGameBoard.numRows(); r++) {
			for ( var c = 0; c < theGameBoard.numCols(); c++) {
				$('div#game_board').append('<div class="disc_holder"><div class="empty_disc"></div></div>')
			}
			$('div#game_board').append('<br class="clear" />')
		}
		$('div#game_board').after('<div class="message_box">Hi</div>')
		$('div#game_board').center();	
		$('div.message_box').width( $('div#game_board').width() )
		$('div.message_box').keepBottom()
		
		$(window).bind('resize', function() {
			$('div#game_board').center();	
			$('div.message_box').width( $('div#game_board').width() )
			$('div.message_box').keepBottom()
		})
	}
	function nextPlayer() 
	{
		currentPlayer *= -1
	}
	function getPointer() {
		return {
			left: $('div.pointer').css('left'),
			top:  $('div.pointer').css('top')
		}
	}
	function drawPointer( left, top) {
		$('div.pointer').css('display','block')
		$('div.pointer').css('left', (left + 15) + "px")
		$('div.pointer').css('top', (top - 120) + "px")
	}
	function drawCurrentDisc( left, top) {
		$('div.current_disc').css('display','block')
		$('div.current_disc').css('left', (left + 5) +  "px")
		$('div.current_disc').css('top', (top - 50) + "px")
	}
	function writeMessage( message, class_type ) {
		$('div.message_box').removeClass().addClass('message_box').addClass(class_type)
		$('div.message_box').text(message)
	}
	$(document).ready( function() {
		createBoard()
		$('div.current_disc').addClass('red_disc')
		
		
		$(document).bind('click',function(e){ 
			for (var c = 0; c < 7; c++) {
				var column = $('div#game_board').find('div.disc_holder:nth-child('+(c+1)+')')
				if (column.offset().left < e.pageX && e.pageX < (column.offset().left + column.outerWidth())) {
					var thisCol = c,
					    currentDisc = (currentPlayer == 1) ? 'red_disc' : 'yellow_disc',
					    nextDisc = (currentPlayer == -1)   ? 'red_disc' : 'yellow_disc'
					    
					if ( !theGameBoard.gameWon() && !inAnimation && theGameBoard.placeDisc( currentPlayer, c) != -1) {
						$('div.current_disc').css('left', (column.offset().left + 5) +  "px")
						var whichDrop = theGameBoard.numRows() - 1
						for (var r = theGameBoard.numRows() - 1; r >= 0; r--) {
							if (theGameBoard.board()[r][c] != theGameBoard.disc().empty) {
								whichDrop = r
							}
						}
						inAnimation = true
						$('div.current_disc').animate({
							top: '+=' +((51*(whichDrop+1))+4),
						}, (200*whichDrop), function() {
							var cell = (whichDrop*theGameBoard.numCols()) + thisCol,
							    newColor = $('div#game_board').find('div.disc_holder')[cell]
							
							$(newColor).find('.empty_disc').addClass(currentDisc).removeClass('empty_disc')
							
							$('div.current_disc').css('top', ($('div#game_board').offset().top - 50) + "px")
							
							drawCurrentDisc( getPointer().left , getPointer().top - 50 )
							inAnimation = false
							$('div.current_disc').removeClass(currentDisc).addClass(nextDisc)
							
							theGameBoard.printBoard()
							
							if (theGameBoard.gameWon() != 0)
								writeMessage( (currentPlayer == theGameBoard.disc().red ? "Red":"Yellow") + " Player Has Won", 'success')
							nextPlayer()
						})
					}		
				}
			}
		})
		$(document).bind('mousemove',function(e){ 
			for (var c = 0; c < 7; c++) {
				var column = $('div#game_board').find('div.disc_holder:nth-child('+(c+1)+')')
				 
				if (column.offset().left < e.pageX && e.pageX < (column.offset().left + column.outerWidth())) {
					drawPointer( column.offset().left, column.offset().top )
					if (!inAnimation) {
						drawCurrentDisc( column.offset().left, column.offset().top )
					}
				}
      }
    })
			
	})
			
}()
